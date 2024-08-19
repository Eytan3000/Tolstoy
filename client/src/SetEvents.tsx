import { Dispatch, SetStateAction } from 'react';
import DOMPurify from 'dompurify';

export default function SetEvents({
  events,
  setEvents,
}: {
  events: string[];
  setEvents: Dispatch<SetStateAction<string[]>>;
}) {
  const handleChange = (index: number, value: string) => {
    const clean = DOMPurify.sanitize(value); // Sanitize against XSS

    setEvents((prev) => {
      const updatedEvents = [...prev];
      updatedEvents[index] = clean;
      return updatedEvents;
    });
  };

  return (
    <>
      {events.map((event, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            gap: '4px',
            marginBottom: '10px',
          }}>
          <input
            autoFocus={index === 0}
            type="url"
            placeholder={'Input URL here...'}
            value={event}
            onChange={(e) => handleChange(index, e.target.value)}
          />

          {events.length > 3 && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setEvents((prev) => {
                  const updatedEvents = [...prev];
                  updatedEvents.splice(index, 1);
                  return updatedEvents;
                });
              }}>
              -
            </button>
          )}
        </div>
      ))}
      <button
        onClick={(e) => {
          e.preventDefault();
          setEvents((prev) => [...prev, '']);
        }}>
        +
      </button>
    </>
  );
}
