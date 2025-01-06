import styled from "styled-components";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { collection, addDoc, onSnapshot, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import send from "../assets/send.svg";
import ChattingBox from "../components/ChattingBox";

interface Message {
    id: string;
    content: string;
    isMine: boolean;
    who: string;
    timestamp: Timestamp;
}

const ChattingScreen: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    const [searchParams] = useSearchParams();
    const name = searchParams.get("name") || "Anonymous"; // URL에서 name 값을 가져옴, 없으면 'Anonymous'

    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    content: data.content,
                    isMine: data.who === name, // URL의 name과 비교하여 isMine 설정
                    who: data.who,
                    timestamp: data.timestamp,
                };
            }) as Message[];
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [name]);

    const sendMessage = async () => {
        if (input.trim() === "") return;

        await addDoc(collection(db, "messages"), {
            content: input,
            who: name, // URL에서 가져온 name을 저장
            timestamp: Timestamp.now(),
        });

        setInput("");
    };

    return (
        <Container>
            <ContentContainer>
                <ChattingSection>
                    <ChattinContent>
                        {messages.map((message) => (
                            <ChattingBox
                                key={message.id}
                                isMine={message.isMine}
                                who={message.who}
                                content={message.content}
                            />
                        ))}
                        <div style={{ height: 100 }}></div>
                        <SendSection>
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="메시지를 입력하세요..."
                            />
                            <img src={send} onClick={sendMessage} style={{ cursor: "pointer" }} />
                        </SendSection>
                    </ChattinContent>
                </ChattingSection>
                <SummarySection>
                    <TitleContainer>
                        <TitleText>회의요약</TitleText>
                        <SummayButton>요약하기</SummayButton>
                    </TitleContainer>
                    <SummaryContent>요약내용이유~~~~</SummaryContent>
                </SummarySection>
            </ContentContainer>
        </Container>
    );
};

export default ChattingScreen;

const SummaryContent = styled.div`
    color: #000;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`
const SummayButton = styled.div`
    display: flex;
    padding: 10px 12px;
    justify-content: center;
    align-items: center;
    gap: 14px;
    border-radius: 12px;
    background: #000;
    color: #FFF;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`

const TitleText = styled.text`
    color: #000;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    align-self: stretch;
`

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ContentContainer = styled.div`
    display: flex;
    width: 1240px;
    height: 100vh;
    align-items: flex-start;
    flex-shrink: 0;
`
const SendSection = styled.div`
    position: absolute;
    bottom: 0;
    display: flex;
    padding-bottom: 36px;
    align-items: center;
    gap: 13px;
    align-self: stretch;
    background-color: white;
    width: 560px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
`;

const Input = styled.input`
    display: flex;
    padding: 16px 18px;
    align-items: center;
    gap: 10px;
    flex: 1 0 0;
    border-radius: 12px;
    border: 1px solid #CACACA;
`

const ChattingSection = styled.div`
    overflow-y: auto;
    display: flex;
    padding-top: 24px;
    padding-right: 48px;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    flex: 1 0 0;
    align-self: stretch;
`;

const SummarySection = styled.div`
    display: flex;
    padding: 36px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    flex: 1 0 0;
    align-self: stretch;
    border-left: 1px solid #E2E2E2;
    background: #FFF;
`

const ChattinContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;  
`;
