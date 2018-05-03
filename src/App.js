import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
	Col, Button, Form, FormGroup, Label, Input, FormText, Modal,
	Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
	UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import bittrex from 'node-bittrex-api';

class App extends Component {
	state = {
		apiKey: '',
		apiSecret: '',
	    isNavOpen: false
	}

	componentDidMount() {
		console.log('this', this);
		//this.connectApi('2bc66c9699a54560b7bd8764aef797b6');
	}

	connectApi(e) {
		var apiKey = e.currentTarget.value;
		console.log('e', e, 'apiKey', apiKey, 'this', this);
		if (typeof apiKey === 'string' && apiKey.length === 32) {

		}
	}

  	render() {
		var apiKey = this.state.apiKey;
		if (typeof apiKey === 'string' && apiKey.length === 32) {
			bittrex.options({
			  'apikey' : this.state.apiKey,
			  'apisecret' : this.state.apiSecret,
			  'baseUrl' : 'https://bittrex.com/api/v1.1',
			});
			bittrex.getmarketsummaries( function( data, err ) {
			  if (err) {
			    return console.error(err);
			  }
			  for( var i in data.result ) {
			    bittrex.getticker( { market : data.result[i].MarketName }, function( ticker ) {
			      console.log( ticker );
			    });
			  }
			});
		}
    	return (
		<div>
        <Navbar color="light" light expand="md">
			<NavbarToggler onClick={e=>this.setState({ isNavOpen: !this.state.isNavOpen })} />
          <NavbarBrand href="/">Trex</NavbarBrand>
          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>

		<Modal isOpen={this.state.apiKey === ''}>
			<Input ref={i=>{this.apiKeyInput=i}} placeholder="apiKey" onChange={e=>this.setState({apiKey:e.currentTarget.value})}/>
			<Input ref={i=>{this.apiSecretInput=i}} placeholder="apiKey" onChange={e=>this.setState({apiSecre:e.currentTarget.value})} />
		</Modal>
      </div>
    );
  }
}

export default App;
