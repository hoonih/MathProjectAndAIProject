import styled from "styled-components";

interface ChattingBoxProps {
    isMine: boolean;
    who: string;
    content: string;
}
const ChattingBox = ({isMine, who, content}:ChattingBoxProps) => {
    return (
        <Container isMine={isMine}>
            <Content isMine={isMine}>
                <Title>{who}</Title>
                <MessageBox isMine={isMine}>{content}</MessageBox>
            </Content>

        </Container>
    );
}
export default ChattingBox


const Container = styled.div<{isMine}> `
    display: flex;
    flex-direction: column;
    align-items: ${props => props.isMine ? 'flex-end' : 'flex-start'};
    gap: 12px;
    align-self: stretch;
`;

const Content = styled.div<{isMine}>`
    display: flex;
    width: 211px;
    flex-direction: column;
    align-items: ${props => props.isMine ? 'flex-end' : 'flex-start'};
    gap: 4px;    
`

const Title = styled.text`
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

const MessageBox = styled.div<{isMine}>`
    display: flex;
    padding: 12px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 12px;
    background: ${props => props.isMine ? '#008CFF' : '#EFEFEF'};
    color: ${props => props.isMine ? '#FFF' : '#000'};
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    `;
