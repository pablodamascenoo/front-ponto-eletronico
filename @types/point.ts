export default interface point {
  date: Date;
  type: "entrada" | "saida";
  id: number;
  user_id: string;
}
