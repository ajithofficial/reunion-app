
const defaultLabels = {
  title: 'Employee Details',
  close: 'Close',
  notProvided: 'Not provided',
};

const EmployeeDetails = ({ user = {}, show = false, onClose, labels = {} }) => {
  const mergedLabels = { ...defaultLabels, ...labels };
  if (!show || !user) return null;

  const fields = [
    { label: 'Age', value: user.age, icon: 'fas fa-birthday-cake text-warning' },
    { label: 'Mobile', value: user.mobileNumber, icon: 'fas fa-phone-alt text-success' },
    { label: 'Company', value: user.companyName, icon: 'fas fa-building text-primary' },
    { label: 'Address', value: user.address, icon: 'fas fa-map-marker-alt text-danger' },
  ];

  return (
    <div className="modal fade show" tabIndex="-1" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content shadow-lg border-0">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">
              <i className="fas fa-user me-2"></i>{mergedLabels.title}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row mb-4">
              <div className="col-md-4 text-center">
                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto shadow" style={{ width: 120, height: 120, fontSize: 48 }}>
                  {user.name ? user.name.charAt(0).toUpperCase() : 'E'}
                </div>
                <h5 className="mt-3" style={{ wordBreak: 'break-word' }}>{user.name || mergedLabels.notProvided}</h5>
                <span className="badge bg-info fs-6 mt-1" style={{ wordBreak: 'break-word' }}>{user.jobTitle || mergedLabels.notProvided}</span>
              </div>
              <div className="col-md-8">
                {fields.map((field, idx) => (
                  <div className={`row mb-3${idx === fields.length - 1 ? '' : ''}`} key={field.label}>
                    <div className="col-sm-4 fw-bold">
                      <i className={`${field.icon} me-2`}></i>{field.label}:
                    </div>
                    <div className="col-sm-8" style={{ wordBreak: 'break-word' }}>{field.value || mergedLabels.notProvided}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              <i className="fas fa-times me-2"></i>{mergedLabels.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
