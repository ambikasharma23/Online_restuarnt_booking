import React, { useState, useEffect } from "react";
import "./css/ClockComponent.css";

const ClockComponent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const drawClock = () => {
    const canvas = document.getElementById("clockCanvas");
    const context = canvas.getContext("2d");

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw clock face
    context.beginPath();
    // context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.fillStyle = "orange";
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = "#000";
    context.stroke();
    context.closePath();

    // Draw clock hands
    drawClockHand(context, centerX, centerY, radius * 0.4, (360 / 12) * (currentTime.getHours() % 12 + currentTime.getMinutes() / 60), 10, "#000"); // Hour hand
    drawClockHand(context, centerX, centerY, radius * 1.7, (360 / 60) * currentTime.getMinutes(), 5, "#000"); // Minute hand
    drawClockHand(context, centerX, centerY, radius * 1.9, (360 / 60) * currentTime.getSeconds(), 2, "#f00"); // Second hand
  };

  useEffect(() => {
    drawClock();
  }, [currentTime]);

  const drawClockHand = (context, x, y, length, angle, width, color) => {
    context.beginPath();
    context.moveTo(x, y);
    const radianAngle = (angle - 90) * (Math.PI / 180);
    const endX = x + length * Math.cos(radianAngle);
    const endY = y + length * Math.sin(radianAngle);
    context.lineTo(endX, endY);
    context.lineWidth = width;
    context.strokeStyle = color;
    context.stroke();
    context.closePath();
  };

  return (
    <div className="clock-container">
      <canvas id="clockCanvas" className="clock"></canvas>
    </div>
  );
};

export default ClockComponent;
