import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
    this.mystate = new ReactiveDict();
});

Template.body.helpers({
    tasks() {
	const instance = Template.instance();
	var filter = new Object();
	
	if (instance.mystate.get('hideCompleted')) {
	    filter.checked = { $ne: true };
	}
	return Tasks.find(filter, { sort : { createdAt: -1 } });
    },
    incompleteCount() {
	return Tasks.find({ checked: { $ne: true } }).count();
    },
});

Template.body.events({
    'submit .new-task'(event) {
	event.preventDefault();

	const target = event.target;
	const text = target.text.value;

	Tasks.insert({
	    text,
	    createdAt: new Date(),
	    owner: Meteor.userId(),
	    username: Meteor.user().username,
	});
	
	target.text.value = '';
    },
    'change .hide-completed input' (event, instance) {
	instance.mystate.set('hideCompleted', event.target.checked);
    },
});
