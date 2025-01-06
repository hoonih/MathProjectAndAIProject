import React, { useEffect, useRef } from 'react';

function JuliaAnimated() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const width = canvas.width;
        const height = canvas.height;

        let animationFrameId;
        let time = 0; // 시간 변수

        // Julia 집합 계산 함수
        const julia = (z, c) => {
            let n = 0;
            const maxIterations = 100;

            while (n < maxIterations) {
                const zRealTemp = z.real;
                z.real = z.real * z.real - z.imaginary * z.imaginary + c.real;
                z.imaginary = 2 * zRealTemp * z.imaginary + c.imaginary;

                if (z.real * z.real + z.imaginary * z.imaginary > 4) {
                    return n; // 탈출 시 반복 횟수 반환
                }
                n++;
            }
            return n;
        };

        const drawJulia = (c) => {
            const imageData = ctx.createImageData(width, height);
            const data = imageData.data;

            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    const z = {
                        real: (x - width / 2) * 4 / width,
                        imaginary: (y - height / 2) * 4 / height,
                    };

                    const iterations = julia(z, c);

                    const color = iterations === 100 ? 0 : iterations * 255 / 100;
                    const index = (y * width + x) * 4;
                    data[index] = color; // Red
                    data[index + 1] = color; // Green
                    data[index + 2] = color; // Blue
                    data[index + 3] = 255; // Alpha
                }
            }

            // 캔버스에 데이터 그리기
            ctx.putImageData(imageData, 0, 0);
        };

        // 애니메이션 루프
        const animate = () => {
            // \( c \)값을 시간에 따라 변화시키기
            const c = {
                real: Math.sin(time * 0.01) * 0.8, // 진폭과 주기를 조정 가능
                imaginary: Math.cos(time * 0.01) * 0.8,
            };

            drawJulia(c);
            animationFrameId = requestAnimationFrame(animate);
        };

        animate(); // 애니메이션 시작

        return () => {
            cancelAnimationFrame(animationFrameId); // 애니메이션 정지
        };
    }, []);

    return <canvas ref={canvasRef} width={800} height={800} />;
}

export default JuliaAnimated;
