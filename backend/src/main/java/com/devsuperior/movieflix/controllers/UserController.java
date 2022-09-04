package com.devsuperior.movieflix.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.movieflix.dto.UserDTO;
import com.devsuperior.movieflix.services.UserService;

@RestController
@RequestMapping(value = "/users") /* resources route */
public class UserController {
		
		@Autowired
		private UserService service;
		
		@PreAuthorize("hasAnyRole('VISITOR', 'MEMBER')")
		@GetMapping(value = "/{id}")
		public ResponseEntity<UserDTO> findById(@PathVariable Long id) {
			UserDTO dto = service.findById(id);
			return ResponseEntity.ok().body(dto);
		}
		
		@GetMapping(value = "/profile")
		 public ResponseEntity<UserDTO> getCurrentUser(){
		        UserDTO user = service.getCurrentUser();
				return ResponseEntity.ok().body(user);
		    }
		
		}



