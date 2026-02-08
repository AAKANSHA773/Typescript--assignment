import KanbanColumn from "./KanbanColumn"

const KanbanBoard = () => {
  return (
     <div className='flex p-4 m-4 p-'>
      <KanbanColumn title="Todo" color="bg-blue-500" cards={[]} />
      <KanbanColumn title="InProgress" color="bg-yellow-500" cards={[]} />
      <KanbanColumn title="Done" color="bg-green-500" cards={[]} />
      </div>
  )
}

export default KanbanBoard
