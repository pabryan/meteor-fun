import { Template } from 'meteor/templating';

import './body.html';

Template.body.helpers({
    tasks: [
	{ text: "1", mess: "one" },
	{ text: "2", mess: "two" },
	{ text: "3", mess: "three" },
	{ text: "4", mess: "four" },
    ],
});
