import React, { FC, useEffect, useReducer } from 'react';
import PaginationItem from './pagination-item/pagination-item';
import { Wrapper } from './pagination.styles';

type PropsType = {
    count: number;
    page: number;
    onChange: (value: number) => void;
};

type StateType = {
    page: number;
    left: number;
    right: number;
    start: number;
    end: number;
};

const Pagination: FC<PropsType> = ({ count, page = 1, onChange }) => {
    const MAX_PAGES_VIEW_COUNT = 7;

    const initialState: StateType = {
        page: page,
        start: 1,
        end: count,
        left: count <= MAX_PAGES_VIEW_COUNT ? count : 2,
        right: count <= MAX_PAGES_VIEW_COUNT ? count : MAX_PAGES_VIEW_COUNT - 1,
    };

    const reducer = (state: StateType, action) => {
        const handler = (value) => {
            let left = state.left;
            let right = state.right;
            if (value === state.start) {
                left = initialState.left;
                right = initialState.right;
            } else if (value === state.end) {
                right = state.end - 1;
                left = state.end - MAX_PAGES_VIEW_COUNT + 2;
            } else if (value === state.right - 1 && state.right + 1 !== state.end) {
                left = state.left + 1;
                right = state.right + 1;
            } else if (value === state.left + 1 && state.left - 1 != state.start) {
                left = state.left - 1;
                right = state.right - 1;
            }
            return {
                ...state,
                page: value,
                left,
                right,
            };
        };
        switch (action.type) {
            case 'increment':
                return handler(state.page + 1);
            case 'decrement':
                return handler(state.page - 1);
            case 'setValue':
                return handler(action.payload);
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        onChange(state.page);
    }, [state]);

    const nextPageHandler = () => {
        dispatch({ type: 'increment' });
    };

    const prevPageHandler = () => {
        dispatch({ type: 'decrement' });
    };

    const setPageHandler = (value) => {
        dispatch({ type: 'setValue', payload: value });
    };

    const pages: Array<number> = [];
    if (state.left === state.right) {
        for (let i = state.start; i <= state.end; i++) {
            pages.push(i);
        }
    } else {
        for (let i = state.left; i <= state.right; i++) {
            pages.push(i);
        }
    }

    const items = [
        /** Start page */
        state.left !== state.right && (
            <PaginationItem key={state.start} value={state.start} isActive={state.start === state.page} onClick={setPageHandler} />
        ),
        /** Inner pages */
        pages.map((item, i) => {
            if (i === 0 && state.left > state.start + 1 && state.left !== state.right) {
                return <PaginationItem key={item} isActive={false} mode="ellipsis" isDisabled />;
            }
            if (i === 4 && state.right < state.end - 1 && state.left !== state.right) {
                return <PaginationItem key={item} isActive={false} mode="ellipsis" isDisabled />;
            }
            return <PaginationItem key={item} value={item} isActive={item === state.page} onClick={setPageHandler} />;
        }),
        /** End page */
        state.left !== state.right && (
            <PaginationItem key={state.end} value={state.end} isActive={state.end === state.page} onClick={setPageHandler} />
        ),
    ];

    return (
        <Wrapper>
            <PaginationItem onClick={prevPageHandler} mode="prev" isDisabled={state.page === 1} />
            {items}
            <PaginationItem isActive={false} onClick={nextPageHandler} mode="next" isDisabled={state.page === count} />
        </Wrapper>
    );
};

export default Pagination;
