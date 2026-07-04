// Use native fetch

const BASE_URL = 'http://localhost:3000/api/events';
const HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer admin'
};

async function runTests() {
  console.log('--- Starting API Tests ---');

  // 1. Create Event
  console.log('\n[1] Creating Event...');
  const eventPayload = {
    title: 'Test Event ' + Date.now(),
    slug: 'test-event-' + Date.now(),
    shortDescription: 'This is a test event.',
    fullDescription: 'Detailed description of the test event.',
    featuredImage: 'https://example.com/image.png',
    category: 'Technology',
    organizer: 'Test Org',
    startDate: new Date(Date.now() + 86400000).toISOString(),
    endDate: new Date(Date.now() + 172800000).toISOString(),
    isRegistrationEnabled: true,
  };

  const createRes = await fetch(BASE_URL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(eventPayload)
  });
  const createData = await createRes.json();
  console.log('Create Response:', createData);
  
  if (!createData.success) {
    console.error('Failed to create event. Exiting.');
    return;
  }
  const eventId = createData.data.id;
  const eventSlug = createData.data.slug;

  // 2. Publish Event
  console.log('\n[2] Publishing Event...');
  const publishRes = await fetch(`${BASE_URL}/${eventId}/publish`, {
    method: 'PATCH',
    headers: HEADERS
  });
  console.log('Publish Response:', await publishRes.json());

  // 3. Register for Event (Public)
  console.log('\n[3] Registering for Event...');
  const registerPayload = {
    attendeeName: 'John Doe',
    attendeePhone: '1234567890'
  };
  const regRes = await fetch(`${BASE_URL}/${eventId}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registerPayload)
  });
  console.log('Register Response:', await regRes.json());

  // 4. Get Attendees (Admin)
  console.log('\n[4] Getting Attendees...');
  const attendeesRes = await fetch(`${BASE_URL}/${eventId}/attendees`, {
    headers: HEADERS
  });
  console.log('Attendees Response:', await attendeesRes.json());

  // 5. Get All Events
  console.log('\n[5] Getting All Events...');
  const allEventsRes = await fetch(BASE_URL);
  const allEventsData = await allEventsRes.json();
  console.log(`All Events Count: ${allEventsData.data?.length}`);

  // 6. Delete Event
  console.log('\n[6] Deleting Event...');
  const delRes = await fetch(`${BASE_URL}/${eventSlug}`, {
    method: 'DELETE',
    headers: HEADERS
  });
  console.log('Delete Response:', await delRes.json());

  console.log('\n--- API Tests Completed ---');
}

runTests().catch(console.error);
