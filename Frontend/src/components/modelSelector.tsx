import { useDispatch, useSelector } from "react-redux";
import { setModel } from "../features/chatSlice";
import { type RootState } from "../app/store";
import "../styles/chat.css";

export default function ModelSelector() {
  const dispatch = useDispatch();
  const model = useSelector((state: RootState) => state.chat.model);

  return (
    <select className="model-selector" value={model} onChange={(e) => dispatch(setModel(e.target.value as any))}>
      <option value="trinity">Trinity</option>
      <option value="stepfun">StepFun</option>
      <option value="glm">GLM</option>
      <option value="nemotron">Nemotron</option>
    </select>
  );
}
