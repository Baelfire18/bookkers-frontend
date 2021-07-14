import React from 'react';
import { MemoryRouter } from 'react-router-dom/cjs/react-router-dom.min';
import renderer from 'react-test-renderer';
import Routes from '../Routes';

function TestRouter({ path }) {
    return (
        <MemoryRouter initialEntries={[path]}>
            <Routes />
        </MemoryRouter>
    );
}

const user = {
    id: 1,
    firstName: 'Testman',
    lastName: 'Tester',
    email: 'test@uc.cl',
    admin: 0,
    imageUrl: 'data:image/png;base64,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',
    acces_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTYyNjMwMjcxNSwiZXhwIjoxNjI2MzMxNTE1fQ.V6ySgOFD9VDrRnr0RcNezujZxNN3lNM2iBFiQC5VTyg',
    token_type: 'Bearer',
};

const sessionExpiration = new Date(
    new Date().getTime() + 1000 * 60 * 60 * 24,
);

const localStorageMapping = {
    user,
    sessionExpiration,
};

describe('LogIn', () =>  {
    describe('When user is not logged in', () => {
        it('renders LogIn', () => {
            const tree = renderer.create(<TestRouter path="/login" />).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
    describe('When user is logged in', () => {
        beforeEach(() => {
            global.Storage.prototype.getItem = jest.fn(
                (key) => JSON.stringify(localStorageMapping[key]),
            );
        });

        afterEach(() => {
            global.Storage.prototype.getItem.mockReset();
        });

        it('renders home with button of LogOut', () => {
            const tree = renderer.create(<TestRouter path="/login" />).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});
