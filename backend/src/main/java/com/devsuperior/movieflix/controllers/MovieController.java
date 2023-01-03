package com.devsuperior.movieflix.controllers;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.services.MovieService;

@RestController
@RequestMapping(value = "/movies")
public class MovieController {

	@Autowired
	private MovieService service;

	// Find movies by movie title.
	@PreAuthorize("hasAnyRole('VISITOR', 'MEMBER')")
	@GetMapping(value = "/title")
	public ResponseEntity<MovieDTO> findByTitle(
			@RequestParam(value = "title", defaultValue = "") String title) {
		MovieDTO dto = service.findByTitle(title);
		return ResponseEntity.ok().body(dto);
	}

	// Find Movies by id.
	@PreAuthorize("hasAnyRole('VISITOR', 'MEMBER')")
	@GetMapping(value = "/{id}")
	public ResponseEntity<MovieDTO> findById(@PathVariable Long id) {
		MovieDTO dto = service.findById(id);
		return ResponseEntity.ok().body(dto);
	}

	// Find movies by genre and order by movie title.
	@PreAuthorize("hasAnyRole('VISITOR', 'MEMBER')")
	@GetMapping
	public ResponseEntity<Page<MovieDTO>> findByGenre(
			@RequestParam(value = "genreId", defaultValue = "0") Long genreId,
			Pageable pageable) {
		Page<MovieDTO> list = service.findByGenre(genreId, pageable);
		return ResponseEntity.ok(list);
	}

	// Return reviews for a Movie.
	@PreAuthorize("hasAnyRole('VISITOR', 'MEMBER')")
	@GetMapping(value = "/{id}/reviews")
	public ResponseEntity<List<ReviewDTO>> reviewsByMovie(@PathVariable Long id) {
		List<ReviewDTO> list = service.reviewsByMovie(id);
		return ResponseEntity.ok().body(list);
	}

	@PreAuthorize("hasAnyRole('MEMBER')")
	@PostMapping
	public ResponseEntity<MovieDTO> insert(@Valid @RequestBody MovieDTO dto) {
		MovieDTO newDTO = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(newDTO.getId()).toUri();
		return ResponseEntity.created(uri).body(newDTO);
	}

	@PreAuthorize("hasAnyRole('MEMBER')")
	@PutMapping(value = "/{id}")
	public ResponseEntity<MovieDTO> update(@PathVariable Long id, @Valid @RequestBody MovieDTO dto) {
		MovieDTO newDTO = service.update(id, dto);
		return ResponseEntity.ok().body(newDTO);
	}

	@PreAuthorize("hasAnyRole('MEMBER')")
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<MovieDTO> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
