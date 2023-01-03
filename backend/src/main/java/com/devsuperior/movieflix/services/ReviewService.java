package com.devsuperior.movieflix.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entities.Movie;
import com.devsuperior.movieflix.entities.Review;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.repositories.ReviewRepository;
import com.devsuperior.movieflix.repositories.UserRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;

@Service
public class ReviewService {

	@Autowired
	private MovieRepository repository;
	
	@Autowired
	private ReviewRepository reviewRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Transactional(readOnly = true)
	public ReviewDTO findById(Long id) {
		Optional<Review> obj = reviewRepository.findById(id);
		Review entity = obj.orElseThrow(() -> new ResourceNotFoundException("Filme não encontrado!"));
		return new ReviewDTO(entity);

	}
		
	@Transactional
	public ReviewDTO insert(ReviewDTO dto) {
		Review review = new Review();
		
		Authentication authentic = SecurityContextHolder.getContext().getAuthentication();
		User userAuthent = userRepository.findByEmail(authentic.getName());
		
		Movie movie = repository.getOne(dto.getMovieId());
		
		review.setUser(userAuthent);
		review.setMovie(movie);
		review.setText(dto.getText());
		
		review = reviewRepository.save(review);
		
		return new ReviewDTO(review);
	}
	
	@Transactional
	public ReviewDTO update(Long id, ReviewDTO dto) {
		try {
			Review review = new Review();
			
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			User userAuthenticated = userRepository.findByEmail(authentication.getName());
			
			Movie movie = repository.getOne(dto.getMovieId());
			
			review.setUser(userAuthenticated);
			review.setMovie(movie);
			review.setText(dto.getText());
			
			review = reviewRepository.save(review);
			
			return new ReviewDTO(review);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id " + id + " not found");
		}
	}
	
}
