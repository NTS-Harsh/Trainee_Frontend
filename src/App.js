import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import MainLayout from './components/MainLayout';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container fluid>
          <MainLayout />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
