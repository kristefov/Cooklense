// Week Plan

import React from 'react';
import Board from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";
import { Navbar, Nav, a, Container, Col, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const WeekPlan = () => {
    // set modal display state
        const board = {
          columns: [
            {
              id: 1,
              title: "todo",
              cards: [{ id: 1, title: "テスト", description: "内容" }]
            },
            { id: 2, title: "in progress", cards: [] },
            { id: 3, title: "done", cards: [] }
          ]
        };
      
        const onNewCard = (draftCard) => ({
          id: new Date().getTime(),
          ...draftCard
        });
      
        const onNewColumn = (draftColumn) => ({
          id: new Date().getTime(),
          ...draftColumn
        });
      
        return (
          <div>
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
      
            <Board
              initialBoard={board}
              allowAddCard={{ on: "top" }}
              allowAddColumn={{ on: "right" }}
              allowRemoveCard
              allowRenameColumn
              onCardNew={console.log}
              onCardRemove={console.log}
              onColumnNew={console.log}
              onColumnRemove={console.log}
              onColumnRename={console.log}
              onNewCardConfirm={onNewCard}
              onNewColumnConfirm={onNewColumn}
            />
          </div>
        );
      }
      
export default WeekPlan;