import PieChart from 'react-minimal-pie-chart'
import { useLocalStorage } from 'react-use'

import { data } from '../src/data'

export default () => {
  const [log, setLog] = useLocalStorage('log', [])

  return (
    <div style={{ margin: '50px' }}>
      <title>Corona Guard</title>
      {process.browser && (
        <PieChart
          animate={true}
          animationDuration={1000}
          animationEasing="ease"
          cx={50}
          cy={50}
          data={[
            {
              color: '#32a852',
              title: 'Recycle',
              value: log
                .map(x => data[x])
                .filter(Boolean)
                .filter(x => x.recyclable).length,
            },
            {
              color: '#964b00',
              title: 'Brown',
              value: log
                .map(x => data[x])
                .filter(Boolean)
                .filter(x => x.compostable).length,
            },
            {
              color: '#696969',
              title: 'Three',
              value: 20,
            },
          ]}
          lengthAngle={360}
          lineWidth={24}
          radius={50}
          rounded
          viewBoxSize={[100, 100]}
          style={{
            height: '300px',
          }}
        />
      )}
      <h1>
        Recyclable:{' '}
        {
          log
            .map(x => data[x])
            .filter(Boolean)
            .filter(x => x.recyclable).length
        }
      </h1>
      <h1>
        Compostable:{' '}
        {
          log
            .map(x => data[x])
            .filter(Boolean)
            .filter(x => x.compostable).length
        }
      </h1>
      <h1>
        Trash:{' '}
        {
          log
            .map(x => data[x])
            .filter(Boolean)
            .filter(x => x.trash).length
        }
      </h1>
      <table>
        <tr>
          <th>Item Name</th>
          <th>Type</th>
          <th>Cost Saved</th>
        </tr>
        {log.map(item => (
          <tr>
            <th>{data[item].displayName}</th>
            <th>
              {data[item].recyclable
                ? 'recyclable'
                : data[item].compostable
                ? 'compostable'
                : 'trash'}
            </th>
            <th>{data[item].cost}</th>
          </tr>
        ))}
      </table>
      <style jsx>{`
        table {
          margin-top: 15px;
          font-family: arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }

        td,
        th {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }

        tr:nth-child(even) {
          background-color: #dddddd;
        }
      `}</style>
    </div>
  )
}
