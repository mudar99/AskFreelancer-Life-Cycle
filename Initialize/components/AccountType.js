import { Component } from "react";


class AccountType extends Component {
    state = {
        Freelancer: this.props.type == 0,
        Client: this.props.type == 1,
        checked: this.props.type == 1 ? 'C' : 'F'
    }
    FreelancerHandler = () => {
        this.setState({
            checked: 'F'
        })
        this.props.Freelancer(0);

    }
    ClientHandler = () => {
        this.setState({
            checked: 'C'
        })
        this.props.Client(1);
    }
    componentDidMount() {
        this.setState({
            checked: this.props.type == 1 ? 'C' : 'F'
        })
    }
    render() {
        return (
            <div className="m-5">
                <h3 className="mb-5  ">: نوع الحساب</h3>
                <form>
                    <label for="Freelancer" className="mr-4">
                        <small >(أبحث عن مشاريع لتنفيذها) </small>فريلانسر
                    </label>
                    <input checked={this.state.checked == 'F'} type="radio" id="Freelancer" name="Account Type" value="Freelancer" onClick={this.FreelancerHandler} />
                    <br />
                    <label for="Client" className="mr-4">
                        <small >(أبحث عن مستقلين لتنفيذ المشاريع) </small>صاحب مشاريع
                    </label>
                    <input checked={this.state.checked == 'C'} type="radio" id="Client" name="Account Type" value="Client" onClick={this.ClientHandler} />
                </form>

            </div>

        );
    }


}
export default AccountType
