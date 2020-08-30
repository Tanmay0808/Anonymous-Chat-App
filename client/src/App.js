import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import JoinChat from "./pages/Join";
import ChatRoom from "./pages/Chat";

function App() {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={JoinChat} />
                <Route path="/chat" component={ChatRoom} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
