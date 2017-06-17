import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Lesson } from './../shared/model/lesson';
import { Observer, store } from './../event-bus-experiments/app-data';

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css']
})
export class LessonsListComponent implements OnInit, Observer {
  lessons: Lesson[] = [];

  constructor() {
    console.log('lesson list is registered as a listener ');
    store.subscribe(this);
   }

  ngOnInit() {          
  }

  next(data: Lesson[]) {
    console.log('lessons list component received data');
    this.lessons = data;  
  }

  toggleLessonViewed(lesson: Lesson) {
    store.toggleLessonViewed(lesson);
  }

  delete(deleted: Lesson) {
    store.deleteLesson(deleted);
  }


  select() {
  }

    // createDuration() {
  //   let duration = Math.floor(Math.random() * 1000).toString();

  //   if(duration.length === 2) {
  //     duration = "" + duration + "0";
  //     return duration.slice(0,1) + ':' + duration.slice(1);
  //   }
  //   return duration.slice(0,1) + ':' + duration.slice(1);
  // }

}


