import { Lesson } from './../shared/model/lesson';
import { testLessons } from './../shared/model/test-lessons';
import { Component, OnInit } from '@angular/core';
import { initializeLessonsList } from './app-data';


@Component({
  selector: 'event-bus-experiments',
  templateUrl: './event-bus-experiments.component.html',
  styleUrls: ['./event-bus-experiments.component.css']
})
export class EventBusExperimentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('Top level component broadcasted all lesssons');
    
    initializeLessonsList(testLessons.slice(0));
    //fake server
    setTimeout(() => {
      const newLesson = {
        id: Math.floor(Math.random() * 1000),
        description: 'New lesson from your friendly backend'
      };  
    
    }, 5000);
  }

  addLesson(lessonText: string) {
  }

}


