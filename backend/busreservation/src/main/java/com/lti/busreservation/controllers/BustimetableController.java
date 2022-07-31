package com.lti.busreservation.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.lti.busreservation.models.Bustimetable;
import com.lti.busreservation.repository.BustimetableRepository;

	@RestController
	public class BustimetableController {
		@Autowired
		private BustimetableRepository bustimetableRepository;
		@GetMapping("/bustimetable")
		public List<Bustimetable> getBustimetable()
		{
			return bustimetableRepository.findAll();
		}
		@PostMapping("/bustimetable")
		public Bustimetable createBustimetable(@Valid @RequestBody Bustimetable bs)
		{
			return bustimetableRepository.save(bs);
		}
		
		

	}


