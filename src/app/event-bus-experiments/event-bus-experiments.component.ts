import { Lesson } from './../shared/model/lesson';
import { testLessons } from './../shared/model/test-lessons';
import { Component, OnInit } from '@angular/core';
import { globalEventBus, LESSONS_LIST_AVAILABLE, ADD_NEW_LESSON} from './event-bus'; 


@Component({
  selector: 'event-bus-experiments',
  templateUrl: './event-bus-experiments.component.html',
  styleUrls: ['./event-bus-experiments.component.css']
})
export class EventBusExperimentsComponent implements OnInit {
  private lessons: Lesson[] = [];
  constructor() { }

  ngOnInit() {
    console.log('Top level component broadcasted all lesssons');
    this.lessons = testLessons.slice(0);

    globalEventBus.notifyObservers(LESSONS_LIST_AVAILABLE, 
    this.lessons);
    //fake server
    setTimeout(() => {
      this.lessons.push({
        id: Math.floor(Math.random() * 1000),
        description: 'New lesson from your friendly backend'
      });  
      globalEventBus.notifyObservers(LESSONS_LIST_AVAILABLE, this.lessons); 
    }, 5000);
  }

  addLesson(lessonText: string) {
    // console.log(lessonText); 
    globalEventBus.notifyObservers(ADD_NEW_LESSON, lessonText);
  }

}


