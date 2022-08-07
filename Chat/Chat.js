import React, { useState, useEffect, useCallback } from 'react';
import { Component } from 'react';

import axios from 'axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import Messagebox from './Messagebox';
import { local } from '../API'
// 2
class Chat extends Component {
    state = {
        RoomID: 0,
        profileID: window.location.href.slice(-1),
        message: '',
        messages: [],
    }

    componentDidMount() {
        axios.defaults.baseURL = local + '/api/';
        axios.defaults.headers = {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        }
        const echo = new Echo({
            broadcaster: 'pusher',
            key: 'cf1398e74504d96c4495',
            cluster: 'eu',
            forceTLS: true,
            auth: {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                }
            }
        });

        axios.get('/room/' + window.location.href.slice(-1)).then(
            res => {
                if (res.data.data != null) {
                    this.setState({
                        RoomID: res.data.data.id
                    })
                }
            }
        ).then(() => {
            echo.channel(`chat.${this.state.RoomID}`)
                .subscribed(() => {
                    console.log('You are subscribed');
                })
                .listen("MessageEvent", (data) => {
                    alert('data')
                });
            console.log(echo.connector)

        }).catch(err => console.error(err));

        axios.get('/message/' + this.state.profileID).then(
            res => {
                if (res.data.data != null) {
                    //console.log(res.data.data)
                    this.setState({
                        messages: res.data.data
                    })
                }
            }).catch(err => console.error(err));
    };

    handleSendMessage = (e) => {
        e.preventDefault();
        let params = {
            body: this.state.message,
        }
        axios.post('/message/' + this.state.profileID, params).catch(err => console.error(err));
    }
    render() {
        return (

            <div className="Chat container lightMode " >
                {
                    this.props.isChatOn &&
                    <form onSubmit={this.handleSendMessage} className="row chat-window col-xl-4 col-lg-5 col-md-6 col-sm-7" id="chat_window_1">
                        <div className="container">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <div className="text-center ">
                                        <h5 className="panel-title mt-2">الدردشة</h5>
                                    </div>
                                </div>
                                <div className="panel-body msg_container_base ">
                                    {this.state.messages.map((message) => (
                                        <Messagebox body={message.body} img="/Img/3.png" status={message.user_id == localStorage.getItem('myID') ? 'sender' : 'reciver'} />
                                    ))}

                                    {/* 
                                <Messagebox
                                    body="HI"
                                    img="/Img/3.png"
                                    time="3:33 PM"
                                    status="sender" />
                                    */
                                    }

                                </div>
                                <div className="panel-footer">
                                    <div className="input-group">
                                        <span className="input-group-btn w-100">
                                            <div className="p-inputgroup">
                                                <InputText placeholder="Vote" onChange={e => this.setState({ message: e.target.value })} />
                                                <Button icon="pi pi-send" className="p-button-sm" type='submit' />
                                            </div>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                }
            </div >
        );
    }
}
export default Chat;