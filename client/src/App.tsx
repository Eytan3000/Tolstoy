import { FormEvent, useState } from 'react';
import './App.css';
import SetEvents from './SetEvents';
import { getCSRF, getUrlsMetadata } from './API';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetUrlsMetadataResponse } from './types';
import Loading from './screens/Loader';
import Alert from './screens/Alert';

// const data = {
//   status: 'sucess',
//   message: [
//     {
//       title: 'Isabela Merced | Actress, Music Department, Soundtrack',
//       description:
//         'Known for: Transformers: The Last Knight, Dora and the Lost City of Gold, Instant Family',
//       image:
//         'https://m.media-amazon.com/images/M/MV5BZWExMzUxNTgtOTJiMS00NTQyLWI0OWItMmUwZDBkNTc1ZTllXkEyXkFqcGdeQXVyMTEzODcxOTE0._V1_FMjpg_UX1000_.jpg',
//     },
//     {
//       title:
//         'הפיצוי לעסקים בצפון יינתן גם על ינואר ופברואר, רשימת היישובים הזכאים שונתה',
//       description:
//         'ועדת הכספים אישרה את הארכת תקנות הפיצוי לעסקים בצפון הארץ לחודשים ינואר פברואר, על אף שמספר יישובים הוצאו ממתווה הפיצוי המלא. יו"ר הוועדה: אישרנו את המתווה בלב כבד כדי לא לעכב את הפיצויים לכל העסקים בצפון, מצפים לתשובות מהאוצר" ',
//       image:
//         'https://ynet-pic1.yit.co.il/picserver5/crop_images/2024/02/25/H1bJ7CSOn6/H1bJ7CSOn6_0_177_3000_1689_0_large.jpg',
//     },
//     {
//       title:
//         'Trump: This is the most dangerous time to be a Jew ‘since the Holocaust’',
//       description:
//         '“What’s happening with Israel and Jewish people, there has never been a more dangerous time since the Holocaust if you happen to be Jewish in America,” Trump told crowds',
//       image:
//         'https://images.jpost.com/image/upload/f_auto,fl_lossy/c_fill,g_faces:center,h_407,w_690/612118',
//     },
//   ],
// };

function checkDuplicates(arr: string[]) {
  console.log('arr: ', arr); //removeEytan
  const set = new Set(arr);
  console.log('set: ', set); //removeEytan
  return arr.length !== set.size;
}
function App() {
  // const queryClient = useQueryClient();

  // const [urls, setUrls] = useState(['', '', '']);
  const [urls, setUrls] = useState(['']);
  const [alert, setAlert] = useState('');

  const mutation = useMutation<GetUrlsMetadataResponse, Error, string[]>({
    mutationFn: getUrlsMetadata,
  });
  const query = useQuery({ queryKey: ['csrf'], queryFn: getCSRF });

  if (query.isError) return <h1>Error</h1>;
  if (query.isLoading) return <Loading />;
  if (query.data) {
    const { csrfToken } = query.data;

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

      mutation.mutate({ urls, csrfToken });
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
                  // box-shadow: 10px 5px 5px red;
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
}

export default App;
