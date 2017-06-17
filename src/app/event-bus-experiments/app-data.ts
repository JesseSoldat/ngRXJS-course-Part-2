import { Lesson } from './../shared/model/lesson';
import * as _ from 'lodash';

export const LESSONS_LIST_AVAILABLE = 'NEW_LIST_AVAILABLE';
export const ADD_NEW_LESSON = 'ADD_NEW_LESSON';

export interface Observer {
	next(data:any);
}
export interface Observable {
	subscribe(obs:Observer);
	unsubscribe(obs:Observer);
}
interface Subject extends Observer, Observable  { 
}

class SubjectImplementation implements Subject {
	private observers: Observer[] = [];
	
	next(data: any) {
		this.observers.forEach(obs => obs.next(data));
	}
	subscribe(obs: Observer) {
		this.observers.push(obs);
	}
	unsubscribe(obs: Observer) {
		_.remove(this.observers, el => el === obs);
	}
}

class DataStore implements Observable {
	private lessons: Lesson[] = [];
	private lessonListSubject = new SubjectImplementation();

	subscribe(obs: Observer) {
		this.lessonListSubject.subscribe(obs);
		obs.next(this.lessons);
	}
	unsubscribe(obs: Observer) {
		this.lessonListSubject.unsubscribe(obs)
	}  

	initializeLessonsList(newList: Lesson[]) {
	//we dont' want to have ref to avoid this being mutated from outside of the component
		this.lessons = _.cloneDeep(newList);
		this.broadcast();
	}

	addLesson(newLesson: Lesson) {
		//avoid mutations from outside NO REF
		this.lessons.push(_.cloneDeep(newLesson));
		this.broadcast();
	}	

	deleteLesson(deleted: Lesson) {
		_.remove(this.lessons, lesson => lesson.id === deleted.id);
		this.broadcast();
	}

	toggleLessonViewed(toggled: Lesson) {
		const lesson = _.find(this.lessons, lesson => lesson.id === toggled.id);

		lesson.completed = !lesson.completed;
		this.broadcast();
	}
	
	broadcast() {
		this.lessonListSubject.next(_.cloneDeep(this.lessons));
	}
}
export const store = new DataStore();