const currentDate = new Date();
const year = currentDate.getFullYear();

const Footer = () => {
  return (
    <div className="absolute bottom-0 p-5">
      © Blue Gym {year} Todos los derechos reservados.
    </div>
  )
}
export default Footer