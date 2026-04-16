import React, { useEffect, useState } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill } from 'react-icons/bs';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import dataJson from '../../data.json';

function Home() {
    const [totalBooks, setTotalBooks] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [issuedPercentage, setIssuedPercentage] = useState(0);

    useEffect(() => {
        const categories = Object.keys(dataJson);
        const allBooks = categories.reduce((acc, cat) => [...acc, ...dataJson[cat]], []);
        const bookCount = allBooks.length;
        const issuedCount = allBooks.filter(b => b.issued).length;

        setTotalBooks(bookCount);
        setTotalCategories(categories.length);
        setIssuedPercentage(Math.round((issuedCount / bookCount) * 100));

        const formattedData = categories.map(category => ({
            name: category.replace(/([A-Z])/g, ' $1').trim(),
            books: dataJson[category].length,
            issued: dataJson[category].filter(b => b.issued).length
        }));

        setChartData(formattedData);
    }, []);

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>Dashboard</h3>
            </div>

            <div className='main-cards'>
                <div className='card book-card'>
                    <div className='card-inner'>
                        <h3>BOOKS</h3>
                        <BsFillArchiveFill className='card_icon'/>
                    </div>
                    <h1>{totalBooks}</h1>
                </div>

                <div className='card genre-card'>
                    <div className='card-inner'>
                        <h3>GENRES</h3>
                        <BsFillGrid3X3GapFill className='card_icon'/>
                    </div>
                    <h1>{totalCategories}</h1>
                </div>

                <div className='card customer-card'>
                    <div className='card-inner'>
                        <h3>MEMBERS</h3>
                        <BsPeopleFill className='card_icon'/>
                    </div>
                    <h1>12</h1>
                </div>
            </div>

            <div className='chart-progress-container'>
                <div className='charts-section'>
                    <h4>Books by Genre</h4>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                            <XAxis dataKey="name" tick={{ fill: '#8b8fa3', fontSize: 12 }} />
                            <YAxis tick={{ fill: '#8b8fa3', fontSize: 12 }} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#1d2634', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} 
                            />
                            <Bar dataKey="books" fill="#6a11cb" radius={[6, 6, 0, 0]} name="Total" />
                            <Bar dataKey="issued" fill="#2575fc" radius={[6, 6, 0, 0]} name="Issued" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className='circular-progress-wrap'>
                    <h4>Issued</h4>
                    <div style={{ width: 120, height: 120 }}>
                        <CircularProgressbar
                            value={issuedPercentage}
                            text={`${issuedPercentage}%`}
                            styles={buildStyles({
                                textSize: '18px',
                                pathColor: '#2575fc',
                                textColor: '#fff',
                                trailColor: 'rgba(255,255,255,0.08)',
                                strokeLinecap: 'round'
                            })}
                        />
                    </div>
                    <p>Books Currently Issued</p>
                </div>
            </div>
        </main>
    );
}

export default Home;
