import { Router, Switch, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import Spinner from './components/Spinner';
import history from './history';
import { useDispatch } from 'react-redux';
import { resetError, loadUser } from './store/toolkit/slices/generalSlice';
import PrivateRoute from './pages/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import { LocaleProvider } from './store/context/LocaleContext';

const AuthVerified = lazy(() => import('./pages/AuthVerified'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const PetListPage = lazy(() => import('./pages/PetListPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const AddPet = lazy(() => import('./pages/AddPet'));
const PetManagePage = lazy(() => import('./pages/PetManagePage'));
const Foundations = lazy(() => import('./pages/Foundations'));
const Home = lazy(() => import('./pages/Home'));
const SideBar = lazy(() => import('./components/SideBar'));
const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./components/Footer'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdoptionPetRequest = lazy(() => import('./pages/AdoptionPetRequest'));
const Admin = lazy(() => import('./pages/Admin'));
const Donation = lazy(() => import('./pages/Donation'));

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetError());

    const token = localStorage.getItem('AUTHORIZATION');

    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router history={history}>
      <LocaleProvider>
        <Suspense fallback={<Spinner />}>
          <ScrollToTop />
          <ScrollToTopButton />
          <SideBar isOpen={isOpen} toggle={toggle} />
          <Navbar toggle={toggle} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/signup' component={RegisterPage} />
            <PrivateRoute
              exact
              path='/foundations/:id/pets'
              component={PetListPage}
            />
            <Route exact path='/verified/:token' component={AuthVerified} />
            <PrivateRoute exact path='/:id/profile' component={UserProfile} />
            <PrivateRoute
              exact
              path='/pets/:id/request'
              component={AdoptionPetRequest}
            />
            <PrivateRoute
              exact
              path='/foundations/:id/add-pet'
              component={AddPet}
            />
            <PrivateRoute
              exact
              path='/pets/:id/manage'
              component={PetManagePage}
            />
            <PrivateRoute exact path='/foundations' component={Foundations} />
            <PrivateRoute exact path='/admin'>
              <Admin isFoundation={true} />
            </PrivateRoute>
            <PrivateRoute exact path='/admin/users'>
              <Admin isFoundation={false} />
            </PrivateRoute>
            <PrivateRoute
              exact
              path='/foundations/:id/donate'
              component={Donation}
            />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </Suspense>
      </LocaleProvider>
    </Router>
  );
}

export default App;
