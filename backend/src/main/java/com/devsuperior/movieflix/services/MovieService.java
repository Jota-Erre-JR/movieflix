package com.devsuperior.movieflix.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Genre;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.repositories.GenreRepository;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.repositories.ReviewRepository;
import com.devsuperior.movieflix.services.exceptions.DataBaseException;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;

@Service
public class MovieService {
	
	@Autowired
	private MovieRepository repository;
	
	@Autowired
	private GenreRepository genreRepository;
	
	@Autowired
	private ReviewRepository reviewRepository;
	
	@Transactional(readOnly = true)
	public MovieDTO findById(Long id) {
		Optional<Movie> obj = repository.findById(id);
		Movie entity = obj.orElseThrow(() -> new ResourceNotFoundException("Filme não encontrado!"));
		return new MovieDTO(entity);

	}
	
	@Transactional(readOnly = true)
	public Page<MovieDTO> findByGenre(Long genreId, Pageable pageable) {
		Genre genre = (genreId == 0) ? null : genreRepository.getOne(genreId);
		Page<Movie> page = repository.find(genre, pageable);	
		repository.findMoviesByGenres(page.getContent());
		return page.map(x -> new MovieDTO(x));

	}
		
	@Transactional(readOnly = true)
	public List<ReviewDTO> reviewsByMovie(Long id) {
		Optional<Movie> obj = repository.findById(id);
		Movie movie = obj.orElseThrow(() -> new ResourceNotFoundException("Movie not found."));
		List<Review> list = reviewRepository.find(id);
		return list.stream().map(x -> new ReviewDTO(x)).collect(Collectors.toList());
	
	}
	@Transactional
	public MovieDTO insert(MovieDTO dto) {
		Movie movie = new Movie();
		
		copyDtoToEntity(dto, movie);
		movie = repository.save(movie);
		
		return new MovieDTO(movie);
	}
	
	@Transactional
	public MovieDTO update(Long id, MovieDTO dto) {
		try {
			Movie movie = repository.getOne(id);
			copyDtoToEntity(dto, movie);
			movie = repository.save(movie);
			return new MovieDTO(movie);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id " + id + " not found");
		}
	}
	
	public void delete(Long id) {
		try {
			repository.deleteById(id);
		}
		catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id " + id + " not found");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integrity violation");
		}
	}
	
	private void copyDtoToEntity(MovieDTO dto, Movie entity) {
		entity.setTitle(dto.getTitle());
		entity.setSubTitle(dto.getSubTitle());
		entity.setYear(dto.getYear());
		entity.setImgUrl(dto.getImgUrl());
		entity.setSynopsis(dto.getSynopsis());
		
		Genre genre = genreRepository.getOne(dto.getGenre().getId());
		entity.setGenre(genre);
		
		entity.getReviews().clear();
		
		for (ReviewDTO reviewDTO : dto.getReviews()) {
			Review review = reviewRepository.getOne(reviewDTO.getId());
			entity.getReviews().add(review);
		}
	}
	
	@Transactional(readOnly = true)
	public MovieDTO findByTitle(String title) {
			Optional<Movie> obj = repository.findOptionalByTitleContainsIgnoreCase(title);
			Movie entity = obj.orElseThrow(() -> new ResourceNotFoundException("Please review the typed content."));
			return new MovieDTO(entity);
	}

}

