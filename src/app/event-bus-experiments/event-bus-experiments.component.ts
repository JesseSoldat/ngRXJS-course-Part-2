import { Lesson } from './../shared/model/lesson';
import { testLessons } from './../shared/model/test-lessons';
import { Component, OnInit } from '@angular/core';
import { store } from './app-data';


@Component({
  selector: 'event-bus-experiments',
  templateUrl: './event-bus-experiments.component.html',
  styleUrls: ['./event-bus-experiments.component.css']
})
export class EventBusExperimentsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('Top level component broadcasted all lesssons');  
    store.initializeLessonsList(testLessons.slice(0));
    //fake server
    setTimeout(() => {
      const newLesson = {
        id: Math.floor(Math.random() * 100000),
        description: 'New lesson from your friendly backend'
      };  
      store.addLesson(newLesson);
    }, 5000);
  }

  addLesson(lessonText: string) {
    const newLesson = {
      id: Math.floor(Math.random() * 100000),
      description: lessonText
    }
    store.addLesson(newLesson);
  } 
}


