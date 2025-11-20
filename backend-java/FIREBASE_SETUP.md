# Firebase Setup Guide

## 🔐 Firebase Service Account File

The `firebase-service-account.json` file is a credential file that allows your backend to securely access Firebase services.

### File Structure

The file should look like this (with your actual project values):

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com",
  "client_id": "123456789012345678901",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your-project-id.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
```

### Field Explanations

| Field | Description |
|-------|-------------|
| `type` | Always "service_account" |
| `project_id` | Your Firebase project ID |
| `private_key_id` | Unique identifier for the private key |
| `private_key` | The actual private key (keep this SECRET!) |
| `client_email` | Service account email address |
| `client_id` | Service account client ID |
| `auth_uri` | OAuth2 authorization endpoint |
| `token_uri` | OAuth2 token endpoint |
| `auth_provider_x509_cert_url` | Certificate URL |
| `client_x509_cert_url` | Client certificate URL |
| `universe_domain` | Usually "googleapis.com" |

---

## 📥 How to Get the Service Account File

### Step 1: Go to Firebase Console

1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)

### Step 2: Navigate to Project Settings

1. Click the **⚙️ gear icon** next to "Project Overview"
2. Select **"Project settings"**

### Step 3: Go to Service Accounts

1. Click on the **"Service accounts"** tab
2. You'll see a section titled **"Firebase Admin SDK"**

### Step 4: Generate New Private Key

1. Scroll down to **"Firebase Admin SDK"** section
2. Select **"Java"** or **"Node.js"** (doesn't matter, same file)
3. Click **"Generate new private key"**
4. A popup will appear warning you about security
5. Click **"Generate key"**

### Step 5: Save the File

1. A JSON file will download automatically
2. Rename it to `firebase-service-account.json`
3. Move it to: `backend-java/src/main/resources/`

```bash
# Example
mv ~/Downloads/your-project-xxxxx-firebase-adminsdk-xxxxx.json \
   backend-java/src/main/resources/firebase-service-account.json
```

---

## 🔒 Security Best Practices

### ⚠️ IMPORTANT: Keep This File Secret!

The service account file contains sensitive credentials. **Never commit it to Git!**

### 1. Add to .gitignore

Make sure it's in your `.gitignore`:

```bash
# In backend-java/.gitignore or root .gitignore
**/firebase-service-account.json
**/*-firebase-adminsdk-*.json
```

### 2. Environment-Specific Files

For different environments, use different service accounts:

```
backend-java/src/main/resources/
├── firebase-service-account-dev.json      # Development
├── firebase-service-account-staging.json  # Staging
└── firebase-service-account-prod.json     # Production
```

Update `application.yml`:
```yaml
firebase:
  credentials:
    path: classpath:firebase-service-account-${ENVIRONMENT:dev}.json
```

### 3. Use Environment Variables (Production)

For production, use environment variables instead of files:

**application.yml:**
```yaml
firebase:
  credentials:
    type: ${FIREBASE_TYPE:service_account}
    project-id: ${FIREBASE_PROJECT_ID}
    private-key-id: ${FIREBASE_PRIVATE_KEY_ID}
    private-key: ${FIREBASE_PRIVATE_KEY}
    client-email: ${FIREBASE_CLIENT_EMAIL}
    client-id: ${FIREBASE_CLIENT_ID}
```

**Set environment variables:**
```bash
export FIREBASE_PROJECT_ID="your-project-id"
export FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
export FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@..."
# etc.
```

### 4. Rotate Keys Regularly

If you suspect the key has been compromised:

1. Go to Firebase Console → Project Settings → Service Accounts
2. Delete the old key
3. Generate a new key
4. Update your application

---

## ✅ Verify Setup

### Check File Location

```bash
ls -la backend-java/src/main/resources/firebase-service-account.json
```

Should show the file exists.

### Check File Format

```bash
cat backend-java/src/main/resources/firebase-service-account.json | jq .
```

Should show valid JSON with all required fields.

### Test Connection

Run the backend and check logs:

```bash
cd backend-java
mvn spring-boot:run
```

Look for:
```
✅ Successfully initialized Firebase Admin SDK
✅ Connected to Firestore: your-project-id
```

---

## 🚨 Common Issues

### Issue 1: File Not Found

```
ERROR: Could not find firebase-service-account.json
```

**Solution:**
- Check the file is in `src/main/resources/`
- Check the filename is exactly `firebase-service-account.json`
- Check `application.yml` path matches

### Issue 2: Invalid Credentials

```
ERROR: Failed to initialize Firebase: Invalid service account credentials
```

**Solution:**
- Re-download the file from Firebase Console
- Make sure it's the correct project
- Check the JSON is valid (no corruption)

### Issue 3: Permission Denied

```
ERROR: Permission denied reading firebase-service-account.json
```

**Solution:**
```bash
chmod 600 backend-java/src/main/resources/firebase-service-account.json
```

### Issue 4: Wrong Project

```
ERROR: Firestore collection not found
```

**Solution:**
- Make sure you're using the service account from the CORRECT Firebase project
- Check Firebase Console that Firestore is enabled
- Verify `project_id` in the JSON matches your Firebase project

---

## 🎯 Quick Setup Checklist

- [ ] Created Firebase project
- [ ] Enabled Firestore Database
- [ ] Downloaded service account JSON
- [ ] Renamed to `firebase-service-account.json`
- [ ] Moved to `backend-java/src/main/resources/`
- [ ] Added to `.gitignore`
- [ ] Verified file permissions (600)
- [ ] Updated `application.yml` with correct project URL
- [ ] Tested backend startup

---

## 📚 Additional Resources

- [Firebase Admin SDK Setup](https://firebase.google.com/docs/admin/setup)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Best Practices for Service Accounts](https://cloud.google.com/iam/docs/best-practices-service-accounts)

---

## 🔄 Example: Complete Setup Flow

```bash
# 1. Download from Firebase Console (manual step)
# File downloaded to: ~/Downloads/pharmacy-finder-xxxx-firebase-adminsdk-xxxx.json

# 2. Move to resources
mv ~/Downloads/pharmacy-finder-*-firebase-adminsdk-*.json \
   backend-java/src/main/resources/firebase-service-account.json

# 3. Set permissions
chmod 600 backend-java/src/main/resources/firebase-service-account.json

# 4. Verify
cat backend-java/src/main/resources/firebase-service-account.json | jq .project_id

# 5. Add to gitignore
echo "firebase-service-account.json" >> backend-java/.gitignore

# 6. Start backend
cd backend-java
./start-backend.sh
```

---

## 💡 Pro Tip: Sample File for Testing

For initial testing without Firebase, create a dummy file:

```bash
cat > backend-java/src/main/resources/firebase-service-account.json << 'EOF'
{
  "type": "service_account",
  "project_id": "test-project",
  "private_key_id": "test123",
  "private_key": "-----BEGIN PRIVATE KEY-----\nTEST\n-----END PRIVATE KEY-----\n",
  "client_email": "test@test.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/test",
  "universe_domain": "googleapis.com"
}
EOF
```

**Note**: This won't actually connect to Firebase, but allows the app to start for testing other features.
