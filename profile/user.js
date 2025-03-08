// Profile picture upload functionality
document.addEventListener('DOMContentLoaded', function() {
    const profileUpload = document.getElementById('profileUpload');
    const uploadTrigger = document.getElementById('uploadTrigger');
    const profilePic = document.getElementById('profilePic');
    const profileInitials = document.getElementById('profileInitials');
    const headerProfilePic = document.getElementById('headerProfilePic');
    const headerInitials = document.getElementById('headerInitials');
    
    // Open file dialog when clicking on the upload icon
    uploadTrigger.addEventListener('click', function() {
      profileUpload.click();
    });
    
    // Handle file selection
    profileUpload.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
          // Update both profile images (main profile and header)
          profilePic.src = e.target.result;
          headerProfilePic.src = e.target.result;
          
          // Hide initials and show images
          profileInitials.classList.add('hidden');
          profilePic.classList.remove('hidden');
          headerInitials.classList.add('hidden');
          headerProfilePic.classList.remove('hidden');
          
          // Store in localStorage for persistence
          localStorage.setItem('ecoTrackProfilePic', e.target.result);
        };
        
        reader.readAsDataURL(file);
      }
    });
    
    // Check if there's a stored profile picture
    const storedProfilePic = localStorage.getItem('ecoTrackProfilePic');
    if (storedProfilePic) {
      profilePic.src = storedProfilePic;
      headerProfilePic.src = storedProfilePic;
      profileInitials.classList.add('hidden');
      profilePic.classList.remove('hidden');
      headerInitials.classList.add('hidden');
      headerProfilePic.classList.remove('hidden');
    }
    
    // Existing device list toggle functionality
    const devicesToggle = document.getElementById('devicesToggle');
    const devicesList = document.getElementById('devicesList');
    const overlay = document.getElementById('overlay');
    const closeDevices = document.getElementById('closeDevices');
    
    devicesToggle.addEventListener('click', function() {
      devicesList.classList.add('active');
      overlay.classList.add('active');
    });
    
    closeDevices.addEventListener('click', function() {
      devicesList.classList.remove('active');
      overlay.classList.remove('active');
    });
    
    overlay.addEventListener('click', function() {
      devicesList.classList.remove('active');
      overlay.classList.remove('active');
    });
  });

