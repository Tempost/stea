~~# Order of operations for sunday...LAUNCH DAY!~~

1. Calender
   a. Main Calender component for the calender page - Look into existing libraries (react-datepicker) - https://github.com/jquense/react-big-calendar
   b. Event component, display on home page.

2. Remove the giant react-datepicker
   a. replace with https://projects.wojtekmaj.pl/react-date-picker/ - infinitly smaller size. much better UI

~~3. Modal or something confirming payment after finishing form~~
~~a. https://tailwindui.com/components/application-ui/overlays/modals~~

~~4. During form validation, check if member is already a member~~

# Bugs

~~1. Check a Member or horse is already in the DB **BEFORE** paying~~
~~a. Alert user, call/email and check current member/horse list~~

~~2. If error after payment, invalidate payment and alert~~

# Features

1. If a current Horse owner decides to become a full member
   there needs to be a way to pull them from owner table and make them a
   full member.

2. Welcome the user after signing up with the form
   a. Some kind of modal or tiny pop-up to inform the user
   that their form was submited succesfully
   ~~b. On the flipside also warn them if failed~~

3. Point Submission (Look at email with the points spreadsheet)
   a. Should generate points for the show
   b. 1-6 placings, ignore non placed attendes
   c. Rider-combos get the points linked to record
   d. Be sure the show has relations with the points/Rider-combos

4. Better Logging
   a. Frontend
   I. Axiom package, log any errors
   ~~b. Backend, just use console.log and console.error~~

5. After user pays, update the record saying if they paid or not

6. Ability to search horse table by owner name
