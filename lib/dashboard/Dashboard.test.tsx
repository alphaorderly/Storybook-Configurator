import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('test', () => {
    it('is', () => {
        const screen = render(<div>ttt</div>);

        const div = screen.getByText('ttt');

        console.log(div);

        expect(div).toBeInTheDocument();
    });
});
