package com.devsuperior.movieflix.services;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.UserDTO;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.UserRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;
import com.devsuperior.movieflix.services.exceptions.UnauthorizedException;

@Service
public class UserService implements UserDetailsService{

	private static Logger logger = LoggerFactory.getLogger(UserService.class);

	@Autowired
	private UserRepository repository;
	
	@Autowired
	private AuthenticService authService; 
	
	@Transactional(readOnly = true)
	public UserDTO findById(Long userId) {
		authService.validateUser(userId);
		Optional<User> obj = repository.findById(userId);
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Please review the typed content."));
		return new UserDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public UserDTO getCurrentUser() {
		try {
			String username = SecurityContextHolder.getContext().getAuthentication().getName();
			User currentUser = repository.findByEmail(username);
			return new UserDTO(currentUser);
		} catch (Exception e) {
			throw new UnauthorizedException("Invalid user");
		}
	}
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user = repository.findByEmail(username);
		if (user == null) {
			logger.error("Email not found:" + username);
			throw new UsernameNotFoundException("Email not found!");
		}
		logger.info("Email found:" + username);
		return user;
	}

}