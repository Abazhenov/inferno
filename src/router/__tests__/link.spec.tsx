import * as Inferno from '../../testUtils/inferno';

import IndexLink from '../IndexLink';
import IndexRoute from '../IndexRoute';
import Link from '../Link';
import Route from '../Route';
import Router from '../Router';
import createBrowserHistory from 'history/createBrowserHistory';
import {
	expect,
} from 'chai';
import {
	render,
} from './../../DOM/rendering';

Inferno;

const AppComponent = ({ children })  => (
  <div>
    <IndexLink id="index">Index</IndexLink>
    <Link id="foo" to="/foo" className="fooClass" activeClassName="active">Foo</Link>
    <Link id="bar" to="/bar" activeStyle={{ color: 'red' }}>Bar</Link>
    <main>
      {children}
    </main>
  </div>
);

const IndexComponent = () => <div>Index</div>
const FooComponent = () => <div>Foo</div>;
const BarComponent = () => <div>Bar</div>; 

const TestApp = ({ url = '/' }) => {
  const history = createBrowserHistory(url);
  return (
    <Router history={ history }>
      <IndexRoute component={ AppComponent }>
        <IndexRoute component={ IndexComponent } />
        <Route path="/foo" component={ FooComponent } />
        <Route path="/bar" component={ BarComponent } />
      </IndexRoute>
    </Router>
  );
}

describe('Router Link Spec (jsx)', () => {
  let container;
  const getMainContent = () => container.getElementsByTagName('main')['0'].innerHTML;

	beforeEach(() => {
		container = document.createElement('div');
	});

  afterEach(() => {
		render(null, container);
		container.innerHTML = '';
	});

  it('should should render Index', () => {
    render(<TestApp />, container);
    expect(getMainContent()).to.equal('<div>Index</div>')
  });

  it('should render a link with class fooClass', () => {
    render(<TestApp />, container);
    expect(container.querySelector("#foo").getAttribute('class')).to.equal('fooClass');
  })

  it('should render activeStyle when active', () => {
    render(<TestApp url="/foo" />, container);
    expect(container.querySelector("#foo").getAttribute('class')).to.equal('fooClass active');
  });

  it('should render activeStyle when active', () => {
    render(<TestApp url="/bar" />, container);
    expect(container.querySelector("#bar").style['color']).to.equal('red');
  });
});