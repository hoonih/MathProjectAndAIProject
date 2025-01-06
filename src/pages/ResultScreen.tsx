import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { simplify, roots } from "mathjs";

function ResultScreen() {
    const canvasRef = useRef(null);
    const location = useLocation();
    const { latex } = location.state || {};  // 전달받은 LaTeX 값을 받음
    const [offset, setOffset] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const drawGrid = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(offset.x, offset.y);

            const gridSize = 50;
            const width = window.innerWidth;
            const height = window.innerHeight;

            // 수평선 그리기
            for (let y = 0; y < height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(-width, y);
                ctx.lineTo(width, y);
                ctx.strokeStyle = y === 0 ? "black" : "#ccc";
                ctx.lineWidth = y === 0 ? 2 : 0.5;
                ctx.stroke();

                if (y !== 0) {
                    ctx.fillText((-y / gridSize).toString(), 10, y);
                }
            }
            for (let y = 0; y > -height; y -= gridSize) {
                ctx.beginPath();
                ctx.moveTo(-width, y);
                ctx.lineTo(width, y);
                ctx.strokeStyle = y === 0 ? "black" : "#ccc";
                ctx.lineWidth = y === 0 ? 2 : 0.5;
                ctx.stroke();

                if (y !== 0) {
                    ctx.fillText((-y / gridSize).toString(), 10, y);
                }
            }
            for (let x = 0; x < width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, -height);
                ctx.lineTo(x, height);
                ctx.strokeStyle = x === 0 ? "black" : "#ccc";
                ctx.lineWidth = x === 0 ? 2 : 0.5;
                ctx.stroke();

                if (x !== 0) {
                    ctx.fillText((x / gridSize).toString(), x, 10);
                }
            }
            for (let x = 0; x > -width; x -= gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, -height);
                ctx.lineTo(x, height);
                ctx.strokeStyle = x === 0 ? "black" : "#ccc";
                ctx.lineWidth = x === 0 ? 2 : 0.5;
                ctx.stroke();

                if (x !== 0) {
                    ctx.fillText((x / gridSize).toString(), x, 10);
                }
            }

            if (latex) {
                drawGraph(ctx, latex);
            }

            ctx.restore();
        };const drawGraph = (ctx, latex) => {
            console.log(latex); // latex 값 확인

            const regex = /([+-]?\d*\.?\d*)\s*[xX]\^(\d+)|([+-]?\d*\.?\d*)\s*[xX](?!\^)|([+-]?\d+(\.\d*)?)/g;

            let matches;
            let terms = [];

            // 정규식을 통해 각 항을 찾고, 계수와 차수를 배열에 추가
            while ((matches = regex.exec(latex)) !== null) {
                if (matches[1] === '') matches[1] = '1';

                if (matches[1] && matches[2]) {
                    // x^n 형태인 경우 (예: 2x^2)
                    const coefficient = matches[1] === "" || matches[1] === "+" ? 1 : (matches[1] === "-" ? -1 : parseFloat(matches[1]));
                    const power = parseInt(matches[2]) || 0;
                    terms.push({ coefficient, power });
                } else if (matches[3]) {
                    // x 형태인 경우 (예: 3x)
                    const coefficient = parseFloat(matches[3]) || 1;
                    const power = 1;
                    terms.push({ coefficient, power });
                } else if (matches[4]) {
                    // 상수 형태인 경우 (예: 5)
                    const coefficient = parseFloat(matches[4]) || 0;
                    const power = 0;
                    terms.push({ coefficient, power });
                }
            }

            console.log("결과 terms:", terms);

            // 원래 함수 그래프를 파란색으로 그리기
            terms.forEach(term => {
                drawPolynomialFunction(ctx, term.coefficient, term.power, "blue");
            });

            // 도함수 계산 및 빨간색으로 그래프 그리기
            terms.forEach(term => {
                if (term.power > 0) {
                    const derivedCoefficient = term.coefficient * term.power;
                    const derivedPower = term.power - 1;
                    drawPolynomialFunction(ctx, derivedCoefficient, derivedPower, "red");
                }
            });
        };

        const drawPolynomialFunction = (ctx, coefficient, power, color) => {
            const width = window.innerWidth / 2;
            const height = window.innerHeight / 2;

            const scaleX = 50; // x축 비율
            const scaleY = 50; // y축 비율

            ctx.beginPath();
            ctx.moveTo(-width / scaleX, -coefficient * Math.pow(-width / scaleX, power) * scaleY);

            for (let x = -width; x < width; x += 2) {
                const y = -coefficient * Math.pow(x / scaleX, power) * scaleY;
                ctx.lineTo(x, y);
            }

            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.stroke();
        };
        drawGrid();
    }, [offset, latex]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const newOffset = { x: e.clientX - dragStart.x, y: e.clientY - dragStart.y };
        setOffset(newOffset);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <>
            <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{
                    display: "block",
                    width: "100vw",
                    height: "100vh",
                    cursor: isDragging ? "grabbing" : "grab",
                }}
            />
        </>
    );
}

const Table = styled.div`
    position: fixed;
    display: flex;
    width: 416px;
    flex-direction: column;
    align-items: flex-start;
    top: 20px;
    left: 20px;
    background-color: white;
`
const TableRow = styled.div`
    display: flex;
    align-items: center;
    align-self: stretch;
`
const Formular = styled.div`
    display: flex;
    width: 236px;
    padding: 15px 0px 16px 0px;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
`
const Value = styled.div`
    display: flex;
    width: 60px;
    padding: 16px 20px 15px 20px;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
`
export default ResultScreen;
