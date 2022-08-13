import { useState } from "react";
import Konva from "konva";
import { Stage, Layer, Line, Group, Circle, Arrow, Text } from "react-konva";

const BLUE1_DEFAULTS = {
  x: 100,
  y: 100,
  points: [50, 50, 150, 50, 100, 150],
  tension: 0.5,
  closed: true,
  stroke: "blue",
  strokeWidth: 4,
  width: 50,
  height: 50,
  draggable: true,
};
const RED_NodeDefult = {
  x: 100,
  y: 200,
  fill: "red",
  width: 30,
  height: 30,
  draggable: true,
};
const Values = () => {
  const [blueNode, updateblueNode] = useState(BLUE1_DEFAULTS);
  const [redNode, updateredNode] = useState(RED_NodeDefult);

  return (
    <Group
      onDragMove={(e) => {
        console.log(e.target.position());
      }}
    >
      <Edge node1={redNode} node2={blueNode} />
      <Circle
        {...BLUE1_DEFAULTS}
        onDragMove={(e) => {
          updateblueNode({ ...blueNode, ...e.target.position() });
        }}
      />
      <Circle
        {...RED_NodeDefult}
        onDragMove={(e) => {
          updateredNode({ ...redNode, ...e.target.position() });
        }}
      />
    </Group>
  );
};
const Edge = ({ node1, node2 }) => {
  const dx = node1.x - node2.x;
  const dy = node1.y - node2.y;
  let angle = Math.atan2(-dy, dx);
  const radius = 10;
  const arrowStart = {
    x: node2.x + -radius * Math.cos(angle + Math.PI),
    y: node2.y + radius * Math.sin(angle + Math.PI),
  };
  const arrowEnd = {
    x: node1.x + -radius * Math.cos(angle),
    y: node1.y + radius * Math.sin(angle),
  };
  const arrowMiddle = {
    x: (arrowStart.x + arrowEnd.x) / 2,
    y: (arrowStart.y + arrowEnd.y) / 2,
  };
  const text = "sanaz";
  return (
    <Group>
      <Arrow
        points={[
          arrowStart.x,
          arrowStart.y,
          arrowMiddle.x,
          arrowMiddle.y,
          arrowEnd.x,
          arrowEnd.y,
        ]}
        stroke="#000"
        fill="#000"
        strokeWidth={1}
        pointerWidth={6}
      />
      <Text
        fill="red"
        x={(node1.x + node2.x) / 2 - 100}
        y={(node1.y + node2.y) / 2 - 100}
        width={200}
        height={200}
        align="center"
        verticalAlign="middle"
        text={text}
      />
    </Group>
  );
};
export default function App() {
  const [blobs, setBlobs] = useState([10]);
  const handelCreateBlob = () => {
    setBlobs((prevBlobs) => [
      ...prevBlobs,
      {
        x: (blobs.length - 1) * 150,
        color: Konva.Util.getRandomColor(),
      },
    ]);
    console.log(blobs);
  };
  return (
    <>
      <button onClick={handelCreateBlob}> CreateBlob</button>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {blobs.map((blob, i) => (
            <Values key={i} x={blob.x} y={blob.y} />
          ))}
        </Layer>
      </Stage>
    </>
  );
}
// <Line
//     key={i}
//     x={blob.x}
//     y={blob.y}
//     points={[50, 50, 150, 50, 100, 150]}
//     tension={0.5}
//     closed
//     fill={blob.color}
//     draggable
// />
