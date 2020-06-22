import React from 'react';
import { Global, css } from '@emotion/core';
import emotionReset from 'emotion-reset';

const GlobalStyles: React.FC = () => {
    return  (
        <Global styles={css`
                ${emotionReset}

                html, body {
                    height: 100%;
                }

                body {
                    margin: 0;
                    font-family: 'Montserrat', 'Open Sans';
                }

                #root {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                }
            `}
        />
    );
};

export { GlobalStyles };
