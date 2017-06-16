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
const lessonListSubject = new SubjectImplementation();

export let lessonsList$: Observable = {
    subscribe: obs => lessonListSubject.subscribe(obs),
    unsubscribe: obs => lessonListSubject.unsubscribe(obs)
};

let lessons: Lesson[] = [];

export function initializeLessonsList(newList: Lesson[]) {
    //we dont' want to have ref to avoid this being mutated from outside of the component
    lessons = _.cloneDeep(newList);
    lessonListSubject.next(lessons);
}