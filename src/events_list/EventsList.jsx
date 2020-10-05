import React, { useState, useEffect } from "react";
import moment from 'moment';
import DailyCalendar from '../daily_calendar/DailyCalendar';
import UpcomingEvent from "../upcoming_event/UpcomingEvent";

export default function EventsList(props) {
	const [eventsToday, setEventsToday] = useState([]);
	const [eventsTomorrow, setEventsTomorrow] = useState([]);

	useEffect(() => {
		setEventsToday(props.events.filter((event) => {
			return moment(event.startTime.format("YYYY-MM-DD")).isSame(moment().format("YYYY-MM-DD"));
		}));
		setEventsTomorrow(props.events.filter((event) => {
			return moment(event.startTime.format("YYYY-MM-DD")).isSame(moment().add(1, 'd').format("YYYY-MM-DD"));
		}));
	}, [props.events]);

	return (
		<div className="events-list">
			<div className="daily-calendar">
				<div className="daily-calendar__title">Today</div>
				{eventsToday.length > 0
				? eventsToday.map((event, i) => {
						return (
							<UpcomingEvent
								key={i}
								title={event.summary}
								startTime={event.startTime}
								allDay={event.start.dateTime ? false : true}
							/>
						);
				  })
				: "No events"}
			</div>
			<div className="daily-calendar">
				<div className="daily-calendar__title">Tomorrow</div>
				{eventsTomorrow.length > 0
				? eventsTomorrow.map((event, i) => {
						return (
							<UpcomingEvent
								key={i}
								title={event.summary}
								startTime={event.startTime}
								allDay={event.start.dateTime ? false : true}
							/>
						);
				  })
				: "No events"}
			</div>
		</div>
	);
}
