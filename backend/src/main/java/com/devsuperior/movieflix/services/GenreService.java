package com.devsuperior.movieflix.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.GenreDTO;
import com.devsuperior.movieflix.entities.Genre;
import com.devsuperior.movieflix.repositories.GenreRepository;
import com.devsuperior.movieflix.services.exceptions.DataBaseException;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;

@Service
public class GenreService {

	// @Autowired
	// private AuthenticService authService;

	@Autowired
	private GenreRepository genreRepository;

	@Transactional(readOnly = true)
	public List<GenreDTO> findAll() {
		List<Genre> list = genreRepository.findAll();
		return list.stream().map(x -> new GenreDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public GenreDTO findById(Long id) {
		Optional<Genre> obj = genreRepository.findById(id);
		Genre genre = obj.orElseThrow(() -> new ResourceNotFoundException("Genero não encontrado"));
		return new GenreDTO(genre);
	}
	
	@Transactional
	public GenreDTO insert(GenreDTO dto) {
		Genre genre = new Genre();
		
		genre.setName(dto.getName());
		genre = genreRepository.save(genre);
		
		return new GenreDTO(genre);
	}
	
	@Transactional
	public GenreDTO update(Long id, GenreDTO dto) {
		try {
			Genre genre = genreRepository.getOne(id);
			genre.setName(dto.getName());
			genre = genreRepository.save(genre);
			return new GenreDTO(genre);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id " + id + " not found");
		}
	}
	
	public void delete(Long id) {
		try {
			genreRepository.deleteById(id);
		}
		catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id " + id + " not found");
		}
		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integrity violation");
		}
	}

}
