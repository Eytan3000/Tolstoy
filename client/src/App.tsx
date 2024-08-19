import { FormEvent, useState } from 'react';
import './App.css';
import SetEvents from './SetEvents';
import { getUrlsMetadata } from './API';
import { useMutation } from '@tanstack/react-query';
import { GetUrlsMetadataResponse } from './types';
import Loading from './screens/Loader';
import Alert from './screens/Alert';

function checkDuplicates(arr: string[]) {
  const set = new Set(arr);
  return arr.length !== set.size;
}
function App() {
  const [urls, setUrls] = useState(['', '', '']);
  const [alert, setAlert] = useState('');

  const mutation = useMutation<GetUrlsMetadataResponse, Error, string[]>({
    mutationFn: getUrlsMetadata,
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setAlert('');

    if (urls.some((url) => url === '')) {
      setAlert('Please fill at least 3 inputs');
      return;
    }
    if (checkDuplicates(urls)) {
      setAlert('No duplicates allowed!');
      return;
    }

    mutation.mutate(urls);
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <h1>Input URLs</h1>
        <form onSubmit={handleSubmit}>
          <SetEvents setEvents={setUrls} events={urls} />
          <button disabled={mutation.isPending} type="submit">
            Submit
          </button>
        </form>

        {mutation.isPending && <Loading />}
        {mutation.isError && <Alert message={mutation.error.message} />}
        {alert !== '' && <Alert message={alert} />}
      </div>

      {mutation.isSuccess && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}>
          <hr />
          {mutation.data.message.map((urlData) => (
            <div
              style={{
                width: '40rem',
                border: '0.5px solid #b0b0b0',
                borderRadius: '10px',
                padding: '2rem',
                background: '#f6faff',
                boxShadow: '10px 10px 10px #95959522',
              }}>
              <h2>{urlData.title}</h2>
              <p>{urlData.description}</p>
              <img src={urlData.image} alt="Italian Trulli"></img>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
