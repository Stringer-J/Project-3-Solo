import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Search from './pages/Search/Search';

export const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
    <ApolloProvider client={client}>
    <Router>
      <div className='headerNav'>

        <div className='siteTitle'>
        <img src='./src/assets/Animal_Crossing_Leaf.svg' alt='Leaf Icon' />
          <h1>Leafy Dreams</h1>
        </div>



      </div>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/search" element={<Search />} />
        </Routes>
      <div className='footer'></div>
    </Router>
    </ApolloProvider>
    </>
  )
}

export default App;
