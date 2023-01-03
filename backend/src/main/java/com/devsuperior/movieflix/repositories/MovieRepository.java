package com.devsuperior.movieflix.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.devsuperior.movieflix.entities.Genre;
import com.devsuperior.movieflix.entities.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long>{
		
	@Query("SELECT obj FROM Movie obj "
			+ "WHERE ( :genre IS NULL OR obj.genre = :genre ) "
			+ "ORDER BY obj.title ")
	Page<Movie> find(Genre genre, Pageable pageable);
	
	@Query("SELECT obj FROM Movie obj "
			+ "JOIN FETCH obj.genre "
			+ "WHERE obj IN :movies ")
	List<Movie> findMoviesByGenres(List<Movie> movies);

	@Query("SELECT obj FROM Movie obj "
			+ "JOIN FETCH obj.reviews "
			+ "WHERE obj IN :movieId ")
	Movie findMovieReviews(Long movieId);
	
	Optional<Movie> findOptionalByTitleContainsIgnoreCase(String title);
}