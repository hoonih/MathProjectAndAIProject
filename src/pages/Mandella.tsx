import React, { useEffect, useRef } from 'react';

function Mandelbrot() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const width = canvas.width;
        const height = canvas.height;

        // Mandelbrot 집합 계산 함수
        const mandelbrot = (c) => {
            let z = { real: 0, imaginary: 0 };
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

        // Mandelbrot 집합 그리기
        const drawMandelbrot = () => {
            const imageData = ctx.createImageData(width, height);
            const data = imageData.data;

            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    // x, y 좌표를 복소수로 변환
                    const c = {
                        real: (x - width / 2) * 4 / width,
                        imaginary: (y - height / 2) * 4 / height,
                    };

                    // Mandelbrot 집합 계산
                    const iterations = mandelbrot(c);

                    // 색상 결정
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

        drawMandelbrot();
    }, []);

    return <canvas ref={canvasRef} width={800} height={800} />;
}

export default Mandelbrot;

