import React, { useState } from "react";
import styled from "styled-components";
import katex from "katex";
import "katex/dist/katex.min.css";
import {useNavigate} from "react-router-dom";

function InputScreen() {

    const navigate = useNavigate();
    const [input, setInput] = useState(""); // LaTeX 원본 입력
    const [renderedLatex, setRenderedLatex] = useState(""); // 렌더링 결과

    const handleButtonClick = (value) => {
        if (value === "backspace") {
            const newInput = input.slice(0, -1);
            setInput(newInput);
            renderLatex(newInput);
        } else if (value === "next") {
            navigate("/result", { state: { latex: input } });  // LaTeX 값을 상태로 전달
        } else {
            const newInput = input + value;
            setInput(newInput);
            renderLatex(newInput);
        }
    };


    const renderLatex = (latexString) => {
        try {
            const rendered = katex.renderToString(latexString, {
                throwOnError: false,
            });
            setRenderedLatex(rendered);
        } catch (error) {
            setRenderedLatex("Error rendering LaTeX");
        }
    };

    return (
        <Background>
            <Container>
                <TitleandInput>
                    <Title>증감표 작성하기</Title>
                    <Input>
                        <RenderedMath dangerouslySetInnerHTML={{ __html: renderedLatex }} />
                    </Input>
                </TitleandInput>
                <Buttondiv>
                    <ButtonSubContainer>
                        <Button onClick={() => handleButtonClick("2")}>2</Button>
                        <Button onClick={() => handleButtonClick("^")}>^</Button>
                        <Button onClick={() => handleButtonClick("3")}>3</Button>
                        <Button onClick={() => handleButtonClick("+")}>+</Button>
                    </ButtonSubContainer>
                    <ButtonSubContainer>
                        <Button onClick={() => handleButtonClick("1")}>1</Button>
                        <Button onClick={() => handleButtonClick("4")}>4</Button>
                        <Button onClick={() => handleButtonClick("5")}>5</Button>
                        <Button onClick={() => handleButtonClick("-")}>-</Button>
                    </ButtonSubContainer>
                    <ButtonSubContainer>
                        <Button onClick={() => handleButtonClick("6")}>6</Button>
                        <Button onClick={() => handleButtonClick("7")}>7</Button>
                        <Button onClick={() => handleButtonClick("8")}>8</Button>
                        <Button onClick={() => handleButtonClick("*")}>*</Button>
                    </ButtonSubContainer>
                    <ButtonSubContainer>
                        <Button onClick={() => handleButtonClick("9")}>9</Button>
                        <Button onClick={() => handleButtonClick("0")}>0</Button>
                        <Button onClick={() => handleButtonClick("X")}>X</Button>
                        <Button onClick={() => handleButtonClick("backspace")}>⟵</Button>
                        <Button onClick={() => handleButtonClick("next")}>다음</Button>
                    </ButtonSubContainer>
                </Buttondiv>
            </Container>
        </Background>
    );
}

export default InputScreen;

const Background = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
`;

const Input = styled.div`
    display: flex;
    padding: 22px 18px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 12px;
    border: 1px solid #989898;
    min-height: 50px;
    font-size: 18px;
    overflow-x: auto;
    white-space: nowrap;
    height: 80px;
`;

const RenderedMath = styled.div`
    font-size: 24px;
    color: #000;
`;

const Container = styled.div`
    display: flex;
    width: 460px;
    flex-direction: column;
    align-items: flex-start;
    gap: 23px;
    flex-shrink: 0;
    justify-content: center;
`;

const TitleandInput = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    align-self: stretch;
`;

const Title = styled.div`
    color: #000;
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const Buttondiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 13px;
    align-self: stretch;
`;

const ButtonSubContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    align-self: stretch;
`;

const Button = styled.div`
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;
    border-radius: 12px;
    background: #000;
    color: #FFF;
    font-family: SUIT;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
    user-select: none;

    &:hover {
        background: #333;
    }
`;
