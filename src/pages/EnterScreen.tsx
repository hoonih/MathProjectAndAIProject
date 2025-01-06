import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EnterScreen = () => {
    const [name, setName] = useState(""); // 이름을 저장할 상태
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

    const handleEnter = () => {
        if (name.trim()) {
            navigate(`/chat?name=${encodeURIComponent(name)}`); // 이름을 쿼리 매개변수로 전달
        } else {
            alert("이름을 입력해주세요!"); // 이름이 비어있을 경우 경고
        }
    };

    return (
        <Container>
            <Content>
                <InputDiv>
                    <Title>
                        이름을 입력하세요
                    </Title>
                    <Input
                        placeholder={"입력해주세요"}
                        value={name}
                        onChange={(e) => setName(e.target.value)} // 입력값 상태 업데이트
                    />
                </InputDiv>
                <Button onClick={handleEnter}>입장하기</Button>
            </Content>
        </Container>
    );
};

export default EnterScreen;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`;

const Content = styled.div`
    display: flex;
    width: 320px;
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    flex-shrink: 0;
`;

const InputDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
`;

const Title = styled.p`
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const Input = styled.input`
    display: flex;
    width: 320px;
    padding: 16px 18px;
    align-items: center;
    gap: 10px;
    border-radius: 12px;
    border: 1px solid #CACACA;
`;

const Button = styled.div`
    cursor: pointer;
    display: flex;
    height: 49px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 12px;
    background: #008CFF;
    color: #FFF;
    font-family: SUIT;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;
