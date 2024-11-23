import { useState } from 'react'
import Head from 'next/head'

const Counter: React.FunctionComponent = () => {
    const [count, setCount] = useState(0)

    return (
        <div>
            <Head>
                <title>Counter</title>
            </Head>
            <h1 style={{ color: 'green' }}>
                GeeksforGeeks
            </h1>
            <h3>Counter Example</h3>
            <p>Count: {count}</p>
            <button onClick=
                {() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    )
}

export default Counter;