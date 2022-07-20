import { Component } from "react";


class AccountType extends Component {
    state = {
        Freelancer: false,
        Client: false,
    }
    FreelancerHandler = () => { 
        this.props.Freelancer(true);
        this.props.Client(false);
    }
    ClientHandler = () => { 
        this.props.Client(true);
        this.props.Freelancer(false);
    }
    render() {
        return (
            <div className="m-5">
                <h3 className="mb-5  ">: نوع الحساب</h3>
                <form>
                    <label for="Freelancer" className="mr-4">
                        <small >(أبحث عن مشاريع لتنفيذها) </small>فريلانسر
                    </label>
                    <input type="radio" id="Freelancer" name="Account Type" value="Freelancer" onClick={this.FreelancerHandler} />
                    <br />
                    <label for="Client" className="mr-4">
                        <small >(أبحث عن فريلانسرز لتنفيذ المشاريع) </small>صاحب مشاريع
                    </label>
                    <input type="radio" id="Client" name="Account Type" value="Client" onClick={this.ClientHandler} />
                </form>

            </div>

        );
    }


}
export default AccountType
